import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface UserProgress {
  eco_points: number;
  level: number;
  total_reports: number;
  resolved_reports: number;
  pending_reports: number;
}

interface UserBadge {
  badge_name: string;
  badge_icon: string;
  earned_at: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
  icon: string;
}

interface WasteReport {
  id: string;
  waste_type: string;
  location: string;
  status: string;
  created_at: string;
  points_earned: number;
}

interface UserReward {
  reward_id: string;
  claimed_at: string;
}

export function useUserProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate level from points
  const calculateLevel = (points: number) => Math.floor(points / 200) + 1;
  const pointsToNextLevel = (points: number) => 200 - (points % 200);
  const levelProgress = (points: number) => ((points % 200) / 200) * 100;

  // Fetch all user data
  const fetchUserData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch user progress - create if doesn't exist
      let { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (progressError && progressError.code === "PGRST116") {
        // No progress found, create initial progress
        const { data: newProgress, error: insertError } = await supabase
          .from("user_progress")
          .insert({
            user_id: user.id,
            eco_points: 0,
            level: 1,
            total_reports: 0,
            resolved_reports: 0,
            pending_reports: 0,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Error creating progress:", insertError);
        } else {
          progressData = newProgress;
        }
      } else if (progressError) {
        console.error("Error fetching progress:", progressError);
      }

      if (progressData) {
        setProgress(progressData);
      }

      // Fetch user badges
      const { data: badgesData } = await supabase
        .from("user_badges")
        .select("*")
        .eq("user_id", user.id);
      
      if (badgesData) setBadges(badgesData);

      // Fetch available rewards
      const { data: rewardsData } = await supabase
        .from("rewards")
        .select("*")
        .order("points_required", { ascending: true });
      
      if (rewardsData) setRewards(rewardsData);

      // Fetch user claimed rewards
      const { data: userRewardsData } = await supabase
        .from("user_rewards")
        .select("*")
        .eq("user_id", user.id);
      
      if (userRewardsData) setUserRewards(userRewardsData);

      // Fetch recent reports
      const { data: reportsData } = await supabase
        .from("waste_reports")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (reportsData) setReports(reportsData);

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new waste report
  const createReport = async (wasteType: string, location: string, description?: string) => {
    if (!user) return { error: "Not authenticated" };

    const pointsEarned = 50; // Base points for creating a report

    const { data, error } = await supabase
      .from("waste_reports")
      .insert({
        user_id: user.id,
        waste_type: wasteType,
        location: location,
        description: description,
        points_earned: pointsEarned,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating report:", error);
      return { error: error.message };
    }

    // Update user progress
    await updateProgress(pointsEarned, 1, 0, 1);

    return { data };
  };

  // Update user progress
  const updateProgress = async (
    addPoints: number,
    addReports: number = 0,
    addResolved: number = 0,
    addPending: number = 0
  ) => {
    if (!user || !progress) return;

    const newPoints = progress.eco_points + addPoints;
    const newLevel = calculateLevel(newPoints);

    const { error } = await supabase
      .from("user_progress")
      .update({
        eco_points: newPoints,
        level: newLevel,
        total_reports: progress.total_reports + addReports,
        resolved_reports: progress.resolved_reports + addResolved,
        pending_reports: progress.pending_reports + addPending,
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating progress:", error);
    }
  };

  // Claim a reward
  const claimReward = async (rewardId: string) => {
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("user_rewards")
      .insert({
        user_id: user.id,
        reward_id: rewardId,
      });

    if (error) {
      console.error("Error claiming reward:", error);
      return { error: error.message };
    }

    await fetchUserData();
    return { success: true };
  };

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user) return;

    const progressChannel = supabase
      .channel("user-progress-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_progress",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setProgress(payload.new as UserProgress);
          }
        }
      )
      .subscribe();

    const badgesChannel = supabase
      .channel("user-badges-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_badges",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setBadges((prev) => [...prev, payload.new as UserBadge]);
          }
        }
      )
      .subscribe();

    const reportsChannel = supabase
      .channel("waste-reports-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waste_reports",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchUserData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(progressChannel);
      supabase.removeChannel(badgesChannel);
      supabase.removeChannel(reportsChannel);
    };
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchUserData();
  }, [user]);

  return {
    progress,
    badges,
    rewards,
    userRewards,
    reports,
    loading,
    calculateLevel,
    pointsToNextLevel,
    levelProgress,
    createReport,
    claimReward,
    refetch: fetchUserData,
  };
}
