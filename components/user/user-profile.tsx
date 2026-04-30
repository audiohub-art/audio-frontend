"use client";

import { User as UserIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { User } from '@/types/user';
import { FollowButton } from './follow-button';
import { PostList } from '../post/list';
import { useSession } from 'next-auth/react';

export function UserProfile({ user }: { user: User }) {
  const initials = user.name.substring(0, 2).toUpperCase();
  const { data: session } = useSession();
  const isOwnProfile = session?.user?.slug === user.slug;
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl space-y-8">

      <Card className="border-none shadow-md bg-slate-50/50">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary/10">
            <AvatarFallback className="text-2xl bg-primary/5 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <UserIcon className="h-6 w-6 text-slate-400" />
              {user.name}
            </h1>
            {isOwnProfile ? (
              <p className="text-slate-600">Your profile</p>
            ) : (
              <div className="flex justify-center sm:justify-start mt-4">
                <FollowButton userId={user.id} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Posts
          </h2>
        </div>

        {user.posts.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed rounded-lg text-slate-500">
            Aucun post pour le moment.
          </div>
        ) : (
          <PostList posts={user.posts}/>
        )}
      </div>
    </div>
  );
}
