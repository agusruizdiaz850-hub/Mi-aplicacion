import { Link } from "@tanstack/react-router";
import { Heart, MoreHorizontal, Pause, Play, Plus } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  albumById,
  artistById,
  formatTime,
  trackById,
  type Track,
} from "@/data/catalog";
import { usePlayer } from "@/lib/player-store";

export function Cover({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`bg-elevated object-cover ${className}`} />;
}

export function PlayFab({
  label,
  playing,
  onClick,
  className = "",
}: {
  label: string;
  playing?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`grid size-11 place-items-center rounded-full bg-fg text-bg shadow-lg ${className}`}
    >
      {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
    </button>
  );
}

export function AlbumCard({ albumId }: { albumId: string }) {
  const album = albumById(albumId);
  const playTracks = usePlayer((s) => s.playTracks);
  const currentId = usePlayer((s) => s.queue[s.index]);
  const playing = usePlayer((s) => s.playing);
  if (!album) return null;
  const artist = artistById(album.artistId);
  const active = album.trackIds.includes(currentId ?? "");
  return (
    <article className="w-36 shrink-0 md:w-44">
      <div className="group relative aspect-square overflow-hidden rounded-md">
        <Link
          to="/album/$albumId"
          params={{ albumId: album.id }}
          className="absolute inset-0"
          aria-label={album.title}
        >
          <Cover src={album.cover} alt="" className="h-full w-full" />
        </Link>
        <PlayFab
          label={active && playing ? `Pausar ${album.title}` : `Reproducir ${album.title}`}
          playing={active && playing}
          onClick={() => (active ? usePlayer.getState().toggle() : playTracks(album.trackIds))}
          className="absolute right-2 bottom-2 opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        />
      </div>
      <Link to="/album/$albumId" params={{ albumId: album.id }} className="mt-2 block">
        <p className="truncate text-sm font-medium">{album.title}</p>
        <p className="truncate text-xs text-muted">{artist?.name}</p>
      </Link>
    </article>
  );
}

export function MixCard({ mixId, title, subtitle, cover, trackIds }: { mixId: string; title: string; subtitle: string; cover: string; trackIds: string[] }) {
  const playing = usePlayer((s) => s.playing);
  const current = usePlayer((s) => s.queue[s.index]);
  const active = trackIds.includes(current ?? "") && trackIds[0] === current;
  return (
    <article className="relative h-44 w-64 shrink-0 overflow-hidden rounded-xl md:h-48 md:w-72">
      <Link to="/playlist/$playlistId" params={{ playlistId: mixId }} className="absolute inset-0" aria-label={title}>
        <Cover src={cover} alt="" className="h-full w-full" />
        <span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        <span className="absolute right-3 bottom-14 left-3">
          <span className="block text-lg font-bold text-fg">{title}</span>
          <span className="block text-sm text-muted">{subtitle}</span>
        </span>
      </Link>
      <PlayFab
        label={`Reproducir ${title}`}
        playing={active && playing}
        onClick={() => usePlayer.getState().playTracks(trackIds)}
        className="absolute right-3 bottom-3"
      />
    </article>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-balance">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function HScroll({ children }: { children: ReactNode }) {
  return <div className="hide-scroll flex gap-3 overflow-x-auto pb-1">{children}</div>;
}

export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium ${active ? "bg-fg text-bg" : "bg-elevated text-fg"}`}
    >
      {children}
    </button>
  );
}

function Eq() {
  return (
    <span className="flex h-4 w-4 items-end justify-center gap-0.5" aria-hidden>
      <span className="eq-bar" />
      <span className="eq-bar" />
      <span className="eq-bar" />
    </span>
  );
}

export function TrackList({
  ids,
  numbered = true,
  showCover = false,
  onRemove,
}: {
  ids: string[];
  numbered?: boolean;
  showCover?: boolean;
  onRemove?: (id: string) => void;
}) {
  const [menu, setMenu] = useState<string | null>(null);
  const current = usePlayer((s) => s.queue[s.index]);
  const playing = usePlayer((s) => s.playing);
  const liked = usePlayer((s) => s.liked);
  const playTracks = usePlayer((s) => s.playTracks);
  const toggleLike = usePlayer((s) => s.toggleLike);

  return (
    <ol className="mt-2">
      {ids.map((id, index) => {
        const track = trackById(id);
        if (!track) return null;
        const album = albumById(track.albumId);
        const artist = artistById(track.artistId);
        const isCurrent = current === track.id;
        return (
          <li key={`${id}-${index}`} className="group relative">
            <div
              className={`grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 md:grid-cols-[2rem_1fr_5rem_auto] ${isCurrent ? "bg-surface" : "hover:bg-surface"}`}
            >
              <button
                type="button"
                className="grid size-8 place-items-center text-sm text-muted tabular-nums"
                aria-label={`Reproducir ${track.title}`}
                onClick={() => (isCurrent ? usePlayer.getState().toggle() : playTracks(ids, track.id))}
              >
                {isCurrent && playing ? (
                  <Eq />
                ) : isCurrent ? (
                  <Play className="size-4 fill-current text-fg" />
                ) : (
                  <>
                    <span className="group-hover:hidden">{numbered ? index + 1 : <Play className="size-4 fill-current" />}</span>
                    <Play className="hidden size-4 fill-current text-fg group-hover:block" />
                  </>
                )}
              </button>
              <button type="button" className="flex min-w-0 items-center gap-3 text-left" onClick={() => playTracks(ids, track.id)}>
                {showCover && album ? <Cover src={album.cover} alt="" className="size-11 rounded-sm" /> : null}
                <span className="min-w-0">
                  <span className={`block truncate text-sm font-medium ${isCurrent ? "text-fg" : ""}`}>{track.title}</span>
                  <span className="block truncate text-xs text-muted">
                    {artist?.name}
                    {album ? ` · ${album.title}` : ""}
                  </span>
                </span>
              </button>
              <span className="hidden text-right text-xs text-muted tabular-nums md:block">{formatTime(track.duration)}</span>
              <span className="flex items-center">
                <button
                  type="button"
                  aria-label={liked.includes(track.id) ? "Quitar me gusta" : "Me gusta"}
                  onClick={() => toggleLike(track.id)}
                  className="grid size-10 place-items-center"
                >
                  <Heart className={`size-4 ${liked.includes(track.id) ? "fill-accent text-accent" : "text-muted"}`} />
                </button>
                <button
                  type="button"
                  aria-label="Más opciones"
                  className="grid size-10 place-items-center text-muted"
                  onClick={() => setMenu(menu === `${id}-${index}` ? null : `${id}-${index}`)}
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </span>
            </div>
            {menu === `${id}-${index}` ? (
              <TrackMenu track={track} onClose={() => setMenu(null)} onRemove={onRemove} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function TrackMenu({ track, onClose, onRemove }: { track: Track; onClose: () => void; onRemove?: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const playlists = usePlayer((s) => s.playlists);
  const addToPlaylist = usePlayer((s) => s.addToPlaylist);
  const playNext = usePlayer((s) => s.playNext);
  const enqueue = usePlayer((s) => s.enqueue);
  const openCreator = usePlayer((s) => s.openCreator);
  const toggleLike = usePlayer((s) => s.toggleLike);
  const liked = usePlayer((s) => s.liked.includes(track.id));

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) onClose();
    }
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute top-12 right-2 z-30 w-64 rounded-lg bg-elevated p-1 text-sm shadow-xl">
      <MenuButton onClick={() => { playNext(track.id); onClose(); }}>Reproducir a continuación</MenuButton>
      <MenuButton onClick={() => { enqueue(track.id); onClose(); }}>Añadir a la cola</MenuButton>
      <MenuButton onClick={() => { toggleLike(track.id); onClose(); }}>{liked ? "Quitar me gusta" : "Me gusta"}</MenuButton>
      {onRemove ? (
        <MenuButton onClick={() => { onRemove(track.id); onClose(); }}>Quitar de esta lista</MenuButton>
      ) : null}
      <p className="px-3 pt-2 pb-1 text-xs text-muted">Añadir a lista</p>
      {playlists.length === 0 ? <p className="px-3 pb-2 text-xs text-muted">Todavía no tienes listas.</p> : null}
      {playlists.map((playlist) => (
        <MenuButton key={playlist.id} onClick={() => { addToPlaylist(playlist.id, track.id); onClose(); }}>
          {playlist.name}
        </MenuButton>
      ))}
      <MenuButton
        onClick={() => {
          openCreator(track.id);
          onClose();
        }}
      >
        <Plus className="size-4" /> Nueva lista
      </MenuButton>
    </div>
  );
}

function MenuButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-surface">
      {children}
    </button>
  );
}

export function PageIntro({
  cover,
  eyebrow,
  title,
  subtitle,
  onPlay,
  playing,
}: {
  cover: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  onPlay: () => void;
  playing?: boolean;
}) {
  return (
    <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end">
      <Cover src={cover} alt="" className="size-40 rounded-md sm:size-52" />
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-bold text-balance sm:text-5xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-pretty text-muted">{subtitle}</p>
        <button
          type="button"
          onClick={onPlay}
          className="mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg"
        >
          {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
          {playing ? "Pausar" : "Reproducir"}
        </button>
      </div>
    </header>
  );
}
