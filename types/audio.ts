export type Audio = {
  id: string;
  key: string,
  originalName: string;
  duration: number | null;
  status: AudioStatus;
}

export type AudioStatus = 'PENDING' | 'ATTACHED' | 'DELETE';
