"use client";

const PHOTOS = ["/avatar.jpg", "/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg"];

const rows = [
  {
    label: "Basic level",
    sub: "Born in 2003, Ben Lu is an east asian male who loves...",
    complete: true,
    action: "edit",
    photos: PHOTOS,
    editable: true,
  },
  {
    label: "In-depth level",
    sub: "Users who complete this get 78% more matches",
    complete: false,
    action: "add",
    photos: null,
    editable: false,
  },
  {
    label: "Ideal look",
    sub: "Users who upload this get 2× more matches",
    complete: false,
    action: "add",
    photos: null,
    editable: false,
  },
];

interface Props {
  onEditBasics: () => void;
}

export default function ProfileCard({ onEditBasics }: Props) {
  return (
    <div>
      <p
        className="text-white text-[28px] text-center mb-5"
        style={{ fontFamily: "Spencer, serif" }}
      >
        What Ditto knows about you
      </p>

      <div className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-[20px] px-5 py-4 cursor-pointer"
            onClick={row.editable ? onEditBasics : undefined}
            style={
              row.complete
                ? {
                    background: "rgba(8, 23, 33, 0.9)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }
                : {
                    background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 100%)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "none",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08)",
                  }
            }
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[19px] text-white font-medium" style={{ fontFamily: "Spencer, serif" }}>
                {row.label}
              </p>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: row.action === "edit" ? 20 : 24 }}>
                {row.action === "edit" ? "✏️" : "+"}
              </span>
            </div>
            <p className="text-[15px] leading-snug" style={{ color: "rgba(255,255,255,0.4)" }}>
              {row.sub}
            </p>
            {row.photos && (
              <div className="flex gap-2.5 mt-4">
                {row.photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-[60px] h-[60px] rounded-xl object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
