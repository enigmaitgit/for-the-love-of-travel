import Image from "next/image";
import { Play } from "lucide-react";

export default function VideoCard({ video }) {
  return (
    <article className="card overflow-hidden group">
      <div className="relative h-44">
        <Image src={video.image} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 grid place-items-center">
          <button className="h-12 w-12 rounded-full bg-white/90 grid place-items-center">
            <Play className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{video.title}</h3>
        <p className="text-sm text-black/60">{video.meta}</p>
      </div>
    </article>
  );
}
