import { Heart, ListMusic, Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume1, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { albumById, artistById, formatTime, trackById } from "@/data/catalog";
import { bindAudio, handleAudioError, handleEnded, syncAudio, usePlayer } from "@/lib/player-store";

export function AudioEngine() {
  useEffect(() => {
    const el = new Audio();
    el.preload = "none";
    bindAudio(el);
    const onTime = () => {
      usePlayer.setState({
        progress: el.currentTime,
        duration: Number.isFinite(el.duration) ? el.duration : usePlayer.getState().duration,
      });
    };
    const onError = () => {
      const token = Number(el.dataset.token || "0");
      window.setTimeout(() => {
        if (Number(el.dataset.token || "0") !== token) return;
        handleAudioError(token);
      }, 250);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", handleEnded);
    el.addEventListener("error", onError);
    const unsub = usePlayer.subscribe((state, prev) => {
      const sameTrack = state.queue[state.index] === prev.queue[prev.index];
      if (
        sameTrack &&
        state.playing === prev.playing &&
        state.seekNonce === prev.seekNonce &&
        state.volume === prev.volume &&
        state.muted === prev.muted
      ) {
        return;
      }
      syncAudio(prev, state);
    });
    return () => {
      unsub();
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", handleEnded);
      el.removeEventListener("error", onError);
      bindAudio(null);
    };
  }, []);
  return null;
}

export function PlayerBar() {
  const queue = usePlayer((s) => s.queue);
  const index = usePlayer((s) => s.index);
  const playing = usePlayer((s) => s.playing);
  const progress = usePlayer((s) => s.progress);
  const duration = usePlayer((s) => s.duration);
  const shuffle = usePlayer((s) => s.shuffle);
  const repeat = usePlayer((s) => s.repeat);
  const volume = usePlayer((s) => s.volume);
  const muted = usePlayer((s) => s.muted);
  const liked = usePlayer((s) => s.liked);
  const queueOpen = usePlayer((s) => s.queueOpen);
  const track = trackById(queue[index]);
  const album = track ? albumById(track.albumId) : undefined;
  const artist = track ? artistById(track.artistId) : undefined;
  const total = duration || track?.duration || 0;
  const ratio = total ? Math.min(1, progress / total) : 0;

  function seekFrom(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width) * total;
    usePlayer.getState().seek(next);
  }

  return (
    <footer className="relative border-t border-line bg-bg">
      <div
        className="absolute inset-x-0 top-0 h-3 cursor-pointer"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={Math.round(total)}
        aria-valuenow={Math.round(progress)}
        aria-label="Progreso"
        tabIndex={0}
        onClick={seekFrom}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") usePlayer.getState().seek(progress + 5);
          if (event.key === "ArrowLeft") usePlayer.getState().seek(progress - 5);
        }}
      >
        <span className="absolute top-1 right-0 left-0 h-1 bg-elevated">
          <span className="block h-full bg-fg" style={{ width: `${ratio * 100}%` }} />
        </span>
      </div>
      <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-2 px-2 md:h-20 md:grid-cols-[1fr_minmax(0,28rem)_1fr] md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          {track && album ? (
            <button type="button" className="shrink-0" onClick={() => usePlayer.getState().setNowOpen(true)} aria-label="Abrir reproductor">
              <img src={album.cover} alt="" className="size-12 rounded-sm bg-elevated object-cover" />
            </button>
          ) : (
            <span className="size-12 rounded-sm bg-elevated" />
          )}
          <button type="button" className="min-w-0 text-left" onClick={() => track && usePlayer.getState().setNowOpen(true)}>
            <span className="block truncate text-sm font-medium">{track ? track.title : "Elige un himno"}</span>
            <span className="block truncate text-xs text-muted">{track ? artist?.name : "Música cristiana de dominio público"}</span>
          </button>
          {track ? (
            <button
              type="button"
              aria-label={liked.includes(track.id) ? "Quitar me gusta" : "Me gusta"}
              className="grid size-10 shrink-0 place-items-center"
              onClick={() => usePlayer.getState().toggleLike(track.id)}
            >
              <Heart className={`size-4 ${liked.includes(track.id) ? "fill-accent text-accent" : "text-muted"}`} />
            </button>
          ) : null}
        </div>

        <div className="hidden flex-col items-center md:flex">
          <div className="flex items-center gap-2">
            <IconButton label={shuffle ? "Desactivar aleatorio" : "Aleatorio"} onClick={() => usePlayer.getState().toggleShuffle()} active={shuffle}>
              <Shuffle className="size-4" />
            </IconButton>
            <IconButton label="Anterior" onClick={() => usePlayer.getState().prev()}>
              <SkipBack className="size-5 fill-current" />
            </IconButton>
            <button
              type="button"
              aria-label={playing ? "Pausar" : "Reproducir"}
              onClick={() => usePlayer.getState().toggle()}
              className="grid size-11 place-items-center rounded-full bg-fg text-bg"
            >
              {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
            </button>
            <IconButton label="Siguiente" onClick={() => usePlayer.getState().next()}>
              <SkipForward className="size-5 fill-current" />
            </IconButton>
            <IconButton label="Repetir" onClick={() => usePlayer.getState().cycleRepeat()} active={repeat !== "off"}>
              {repeat === "one" ? <Repeat1 className="size-4" /> : <Repeat className="size-4" />}
            </IconButton>
          </div>
          <p className="mt-1 text-xs text-muted tabular-nums">
            {formatTime(progress)} / {formatTime(total)}
          </p>
        </div>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={playing ? "Pausar" : "Reproducir"}
            onClick={() => usePlayer.getState().toggle()}
            className="grid size-11 place-items-center rounded-full bg-fg text-bg md:hidden"
          >
            {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" aria-label={muted || volume === 0 ? "Activar sonido" : "Silenciar"} onClick={() => usePlayer.getState().toggleMute()} className="grid size-10 place-items-center text-muted">
              {muted || volume === 0 ? <VolumeX className="size-4" /> : volume < 0.5 ? <Volume1 className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <input
              aria-label="Volumen"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(event) => usePlayer.getState().setVolume(Number(event.target.value))}
              className="w-24 accent-fg"
            />
          </div>
          <IconButton label="Cola" onClick={() => usePlayer.getState().toggleQueue()} active={queueOpen}>
            <ListMusic className="size-5" />
          </IconButton>
        </div>
      </div>
      <QueuePanel />
    </footer>
  );
}

function IconButton({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={`grid size-10 place-items-center ${active ? "text-fg" : "text-muted"}`}>
      {children}
    </button>
  );
}

function QueuePanel() {
  const open = usePlayer((s) => s.queueOpen);
  const queue = usePlayer((s) => s.queue);
  const index = usePlayer((s) => s.index);
  if (!open) return null;
  return (
    <aside className="absolute right-2 bottom-full z-30 mb-2 max-h-80 w-[min(100%-1rem,20rem)] overflow-y-auto rounded-xl border border-line bg-surface p-2">
      <div className="mb-1 flex items-center justify-between px-2">
        <p className="text-sm font-medium">A continuación</p>
        <button type="button" aria-label="Cerrar cola" onClick={() => usePlayer.getState().toggleQueue()} className="grid size-8 place-items-center text-muted">
          <X className="size-4" />
        </button>
      </div>
      {queue.length === 0 ? <p className="px-2 py-4 text-sm text-muted">La cola está vacía.</p> : null}
      {queue.map((id, i) => {
        const track = trackById(id);
        if (!track) return null;
        return (
          <button
            key={`${id}-${i}`}
            type="button"
            onClick={() => usePlayer.getState().jumpTo(i)}
            className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm ${i === index ? "bg-elevated" : "hover:bg-elevated"}`}
          >
            <span className="min-w-0">
              <span className="block truncate">{track.title}</span>
              <span className="block truncate text-xs text-muted">{artistById(track.artistId)?.name}</span>
            </span>
            <span
              className="grid size-8 shrink-0 place-items-center text-muted"
              onClick={(event) => {
                event.stopPropagation();
                usePlayer.getState().removeFromQueue(i);
              }}
              role="button"
              aria-label="Quitar de la cola"
            >
              <X className="size-3" />
            </span>
          </button>
        );
      })}
    </aside>
  );
}

export function NowPlaying() {
  const open = usePlayer((s) => s.nowOpen);
  const tab = usePlayer((s) => s.nowTab);
  const queue = usePlayer((s) => s.queue);
  const index = usePlayer((s) => s.index);
  const playing = usePlayer((s) => s.playing);
  const progress = usePlayer((s) => s.progress);
  const duration = usePlayer((s) => s.duration);
  const liked = usePlayer((s) => s.liked);
  const shuffle = usePlayer((s) => s.shuffle);
  const repeat = usePlayer((s) => s.repeat);
  const track = trackById(queue[index]);
  if (!open || !track) return null;
  const album = albumById(track.albumId);
  const artist = artistById(track.artistId);
  const total = duration || track.duration;
  const ratio = total ? Math.min(1, progress / total) : 0;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-bg">
      <div className="flex items-center justify-between px-3 py-2">
        <button type="button" aria-label="Cerrar" onClick={() => usePlayer.getState().setNowOpen(false)} className="grid size-11 place-items-center">
          <X className="size-5" />
        </button>
        <p className="text-xs text-muted">{album?.title}</p>
        <span className="size-11" />
      </div>
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-6 pb-8">
        <img src={album?.cover} alt="" className="mx-auto aspect-square w-full max-w-sm rounded-lg bg-elevated object-cover" />
        <div className="mt-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold">{track.title}</h2>
            <p className="truncate text-sm text-muted">
              {artist?.name} · {track.original}
            </p>
            <p className="mt-1 text-xs text-muted">{track.language} · dominio público · LibriVox</p>
          </div>
          <button type="button" aria-label="Me gusta" onClick={() => usePlayer.getState().toggleLike(track.id)} className="grid size-11 place-items-center">
            <Heart className={`size-5 ${liked.includes(track.id) ? "fill-accent text-accent" : "text-muted"}`} />
          </button>
        </div>
        <div
          className="mt-4 h-4 cursor-pointer"
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            usePlayer.getState().seek(((event.clientX - rect.left) / rect.width) * total);
          }}
        >
          <span className="mt-1 block h-1 rounded-full bg-elevated">
            <span className="block h-full rounded-full bg-fg" style={{ width: `${ratio * 100}%` }} />
          </span>
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted tabular-nums">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(total)}</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button type="button" aria-label="Aleatorio" onClick={() => usePlayer.getState().toggleShuffle()} className={`grid size-11 place-items-center ${shuffle ? "text-fg" : "text-muted"}`}>
            <Shuffle className="size-5" />
          </button>
          <button type="button" aria-label="Anterior" onClick={() => usePlayer.getState().prev()} className="grid size-11 place-items-center">
            <SkipBack className="size-6 fill-current" />
          </button>
          <button type="button" aria-label={playing ? "Pausar" : "Reproducir"} onClick={() => usePlayer.getState().toggle()} className="grid size-14 place-items-center rounded-full bg-fg text-bg">
            {playing ? <Pause className="size-6 fill-current" /> : <Play className="ml-1 size-6 fill-current" />}
          </button>
          <button type="button" aria-label="Siguiente" onClick={() => usePlayer.getState().next()} className="grid size-11 place-items-center">
            <SkipForward className="size-6 fill-current" />
          </button>
          <button type="button" aria-label="Repetir" onClick={() => usePlayer.getState().cycleRepeat()} className={`grid size-11 place-items-center ${repeat !== "off" ? "text-fg" : "text-muted"}`}>
            {repeat === "one" ? <Repeat1 className="size-5" /> : <Repeat className="size-5" />}
          </button>
        </div>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={() => usePlayer.getState().setNowTab("letra")} className={`h-9 rounded-full px-4 text-sm ${tab === "letra" ? "bg-fg text-bg" : "bg-elevated"}`}>
            Letra
          </button>
          <button type="button" onClick={() => usePlayer.getState().setNowTab("cola")} className={`h-9 rounded-full px-4 text-sm ${tab === "cola" ? "bg-fg text-bg" : "bg-elevated"}`}>
            Cola
          </button>
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-4">
          {tab === "letra" ? (
            <p className="text-base leading-relaxed whitespace-pre-line text-pretty text-fg">
              {track.lyrics ?? "Esta grabación no trae letra en la app. Es un himno de dominio público cantado por voluntarios."}
            </p>
          ) : (
            <ul>
              {queue.map((id, i) => {
                const item = trackById(id);
                if (!item) return null;
                return (
                  <li key={`${id}-${i}`}>
                    <button type="button" onClick={() => usePlayer.getState().jumpTo(i)} className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm ${i === index ? "bg-surface" : ""}`}>
                      <span className="truncate">{item.title}</span>
                      <span className="ml-3 shrink-0 text-xs text-muted tabular-nums">{formatTime(item.duration)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function CreatorDialog() {
  const creator = usePlayer((s) => s.creator);
  const [name, setName] = useState("");
  useEffect(() => {
    if (creator.open) setName("");
  }, [creator.open]);
  if (!creator.open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-bg/80 p-4">
      <form
        className="w-full max-w-sm rounded-xl bg-surface p-5"
        onSubmit={(event) => {
          event.preventDefault();
          usePlayer.getState().createPlaylist(name);
        }}
      >
        <h2 className="text-lg font-bold">Nueva lista</h2>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nombre de la lista"
          className="mt-4 h-12 w-full rounded-md bg-elevated px-3 text-sm outline-none"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={() => usePlayer.getState().closeCreator()} className="h-10 rounded-full px-4 text-sm text-muted">
            Cancelar
          </button>
          <button type="submit" className="h-10 rounded-full bg-fg px-4 text-sm font-medium text-bg">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
