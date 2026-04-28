"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Post } from "@/types/post"
import { useState, useRef, useEffect } from "react"
import { getUrl } from "@/services/audio"
import { Waviz } from "waviz"
import Link from "next/link"
import { useMute } from "@/providers/sound"
import { Separator } from "../ui/separator"

export function PostCard({ post }: { post: Post }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { isMuted } = useMute();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavizRef = useRef<Waviz | null>(null);

  const drawStaticWave = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#0049a7";
    ctx.lineWidth = 2;

    const midY = canvas.height / 2;
    const amplitude = canvas.height / 20.5;

    for (let x = 0; x <= canvas.width; x += 2) {
      const normalizedX = x / canvas.width;

      const envelope = Math.sin(normalizedX * Math.PI);

      const lowFreq = Math.sin(x * 0.02);
      const midFreq = Math.sin(x * 0.08 + 1) * 0.7;
      const highFreq = Math.sin(x * 0.4 + 2) * 0.35;

      const complexWave = lowFreq + midFreq + highFreq;

      const y = midY + (complexWave * envelope * amplitude);

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  };

  useEffect(() => {
    drawStaticWave();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      console.log("unmute or mute :", isMuted)
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  const handlePlay = async () => {
    if (!audioRef.current) {
      const { data, error } = await getUrl(post.audioFile.key);
      if (data) {
        const audio = new Audio(data);
        audio.crossOrigin = "anonymous";
        audio.volume = 0.5;
        audio.muted = isMuted;
        audioRef.current = audio;
        if (canvasRef.current) {
          wavizRef.current = new Waviz(canvasRef.current, audioRef.current);
        }
      } else {
        return;
      }
    }

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      if (wavizRef.current) {
        wavizRef.current.simpleLine('#0049a7');
      }
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);

      if (wavizRef.current && wavizRef.current.visualizer) {
        wavizRef.current.visualizer.stop();
      }
      drawStaticWave();
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (wavizRef.current && wavizRef.current.visualizer) {
        wavizRef.current.visualizer.stop();
      }
    };
  }, []);

  return (
    <Link href={`/post/${post.id}`}>
    <Card className="w-full h-max shadow-xl dark:border-zinc-800 transition-all hover:shadow-2xl">
      <div onMouseEnter={handlePlay} onMouseLeave={handleStop}>
        <CardHeader>
          <CardTitle className="truncate">{post.title}</CardTitle>
          <CardDescription className="truncate">{post.description}</CardDescription>
        </CardHeader>
        <div className="flex-grow" />
        <CardContent className="pt-0 space-y-4">
          <Separator />

          <div className="flex justify-center items-center bg-gray-100 dark:bg-zinc-900 rounded-md w-full px-4 py-2">
            <canvas
              ref={canvasRef}
              width={1000}
              height={100}
              className="w-full h-[60px]"
            />
          </div>

        </CardContent>
      </div>
      </Card>
    </ Link>
  )
}
