"use client";
import Image from "next/image";
import Link from "next/link";
import { CardType } from "@/types/types";

const Card = ({ name, imgUrl, href }: CardType) => {
  return (
    <Link
      href={href}
      className="m-auto rounded-xl border-gray-400 shadow-2xl overflow-hidden"
    >
      <div className="glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl">
        <div className="my-3">
          <h2 className="w-64 text-ellipsis whitespace-nowrap text-xl font-bold overflow-clip">
            {name}
          </h2>
        </div>
        <div>
          <Image
            src={imgUrl}
            alt={name}
            width={260}
            height={160}
            className="max-h-[200px] min-h-[200px] rounded-lg shadow-lg"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAYAAADq8hJGAAABdUlEQVR42u3UMQEAAAQAMDrpJzpiOLYQy4nqADgpBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCABACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAhCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAnyzJBw/wYL04IgAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
