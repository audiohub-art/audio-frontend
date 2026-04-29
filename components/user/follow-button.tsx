import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getUser, getFollowStatus, followUser, unfollowUser } from '@/services/user';
import { LoaderCircle } from 'lucide-react';

interface FollowButtonProps {
  userId: string;
}

export function FollowButton({ userId }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        if (user) {
          setCurrentUser(user.id);
          setIsOwnProfile(user.id === userId);

          if (user.id !== userId) {
            const status = await getFollowStatus(userId);
            setIsFollowing(status);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleFollow = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      await followUser(userId);
      setIsFollowing(true);
      toast.success('You are now following this user');
    } catch (error) {
      toast.error('Failed to follow user');
      console.error('Error following user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      await unfollowUser(userId);
      setIsFollowing(false);
      toast.success('You have unfollowed this user');
    } catch (error) {
      toast.error('Failed to unfollow user');
      console.error('Error unfollowing user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (isOwnProfile) {
    return null;
  }

  return (
    <Button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      disabled={loading}
      variant={isFollowing ? 'outline' : 'default'}
      className="h-10 px-4 py-2 text-sm font-medium"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <LoaderCircle className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" />
          {isFollowing ? 'Unfollowing...' : 'Following...'}
        </span>
      ) : (
        isFollowing ? 'Unfollow' : 'Follow'
      )}
    </Button>
  );
}
