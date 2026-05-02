"use client";

const PHOTOS = ["/avatar.jpg", "/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg"];

export default function Step6Photos() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[15px] text-white font-medium mb-1">5 pics of your vibe</p>
        <p className="text-[13px] text-white/40 leading-relaxed mb-4">
          Add 5 photos that show your face and vibe. Your first photo is your profile photo.
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-[14px] overflow-hidden relative"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              {i === 0 && (
                <span
                  className="absolute bottom-1.5 left-1.5 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                  style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.7)" }}
                >
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
