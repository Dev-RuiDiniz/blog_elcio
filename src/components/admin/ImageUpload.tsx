"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { HiOutlinePhotograph, HiOutlineX, HiOutlinePlus, HiOutlineDocumentText } from "react-icons/hi";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

export function ImageUpload({ value, onChange, folder = "images", label, accept = "image/*" }: ImageUploadProps) {
  const isPdf = value?.toLowerCase().endsWith('.pdf');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    
    try {
      // Upload direto para Vercel Blob (bypassa limite de 4.5MB)
      const timestamp = Date.now();
      const ext = file.name.split(".").pop();
      const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

      const blob = await upload(filename, file, {
        access: "public",
        handleUploadUrl: "/api/upload/client",
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      onChange(blob.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {value ? (
          <div className="relative w-full h-48 border border-gray-200 dark:border-zinc-700 group">
            {isPdf ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-800">
                <HiOutlineDocumentText className="h-12 w-12 text-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">PDF Carregado</span>
                <a 
                  href={value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline mt-1"
                >
                  Visualizar PDF
                </a>
              </div>
            ) : (
              <Image src={value} alt="Preview" fill className="object-cover" />
            )}
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1.5 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-black dark:hover:border-white flex flex-col items-center justify-center gap-2 transition-colors"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin h-6 w-6 border-2 border-black dark:border-white border-t-transparent rounded-full" />
                {progress > 0 && <span className="text-sm text-gray-500">{progress}%</span>}
              </div>
            ) : (
              <>
                <HiOutlinePhotograph className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Clique para enviar</span>
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  max?: number;
}

export function GalleryUpload({ value = [], onChange, folder = "gallery", label, max = 10 }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of files) {
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

        const blob = await upload(filename, file, {
          access: "public",
          handleUploadUrl: "/api/upload/client",
        });

        newUrls.push(blob.url);
      }
      onChange([...value, ...newUrls].slice(0, max));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="grid grid-cols-4 gap-3">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square border border-gray-200 dark:border-zinc-700 group">
            <Image src={url} alt={`Gallery ${index}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HiOutlineX className="h-3 w-3" />
            </button>
          </div>
        ))}
        {value.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-black dark:hover:border-white flex items-center justify-center transition-colors"
          >
            {uploading ? (
              <div className="animate-spin h-5 w-5 border-2 border-black dark:border-white border-t-transparent rounded-full" />
            ) : (
              <HiOutlinePlus className="h-6 w-6 text-gray-400" />
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
