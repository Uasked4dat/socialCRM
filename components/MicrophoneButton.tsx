'use client';

import React, { useState, useRef } from 'react';

interface MicrophoneButtonProps {
  onTranscription: (transcription: string) => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async (): Promise<void> => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];
        setIsRecording(false);
        setIsLoading(true); // Show loading spinner
        await sendAudioForTranscription(audioBlob);
      };
    }
  };

  const sendAudioForTranscription = async (audioBlob: Blob): Promise<void> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Transcription:', result.transcription);
      onTranscription(result.transcription);
    } catch (err) {
      console.error('Error sending audio for transcription:', err);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`btn btn-circle ${
        isLoading
          ? 'btn-disabled'
          : isRecording
          ? 'bg-red-500 hover:bg-red-600'
          : 'btn-primary'
      } bottom-4 left-4 text-black`}
      aria-label={
        isLoading
          ? 'Processing Transcription'
          : isRecording
          ? 'Stop Recording'
          : 'Start Recording'
      }
      disabled={isLoading} // Disable the button while loading
    >
      {isLoading ? (
        <svg
          className="animate-spin h-6 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : isRecording ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14c1.657 0 3-1.567 3-3V7c0-1.433-1.343-3-3-3s-3 1.567-3 3v4c0 1.433 1.343 3 3 3zM19 10v2a7 7 0 01-14 0v-2m7 7v2m-4 0h8"
          />
        </svg>
      )}
    </button>
  );
};

export default MicrophoneButton;
