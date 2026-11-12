import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Clock, Compass, Heart, Home, Library, Plus, Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { trackById } from "@/data/catalog";
import { usePlayer } from "@/lib/player-store";
import { AudioEngine, CreatorDialog, NowPlaying, PlayerBar } from "@/components/player";

function useQueryParam() {
  return useRouterState({
    select: (state) => {
      const search = state.location.search as { q?: unknown };
      return typeof search?.q === "string" ? search.q : "";
    },
  });
}

export function AppShell() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const query = useQueryParam();
  const [value, setValue] = useState(query);
  const playlists = usePlayer((s) => s.playlists);

  useEffect(() => setValue(query), [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.code === "Space") {
        event.preventDefault();
        usePlayer.getState().toggle();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const unsub = usePlayer.subscribe((state, prev) => {
      const id = state.queue[state.index];
      const prevId = prev.queue[prev.index];
      if (id === prevId && state.playing === prev.playing) return;
      const track = state.queue.length ? id : undefined;
      document.title = track && state.playing ? `${trackTitle(track)} · Gracia` : "Gracia";
    });
    return unsub;
  }, []);

  function onSearch(next: string) {
    setValue(next);
    void navigate({ to: "/search", search: { q: next } });
  }

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <AudioEngine />
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-line px-3 py-4 md:flex">
          <Link to="/" className="mb-6 flex items-center gap-2 px-2">
            <Logo />
            <span className="text-lg font-bold">Gracia</span>
          </Link>
          <nav className="flex flex-col gap-1">
            <NavItem to="/" icon={<Home className="size-5" />} label="Inicio" exact />
            <NavItem to="/explore" icon={<Compass className="size-5" />} label="Explorar" />
            <NavItem to="/library" icon={<Library className="size-5" />} label="Biblioteca" />
          </nav>
          <div className="mt-6 flex items-center justify-between px-2">
            <p className="text-sm text-muted">Tu música</p>
            <button type="button" aria-label="Nueva lista" onClick={() => usePlayer.getState().openCreator()} className="grid size-8 place-items-center text-muted">
              <Plus className="size-4" />
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-1 overflow-y-auto">
            <SideLink to="/playlist/$playlistId" params={{ playlistId: "likes" }} icon={<Heart className="size-4" />} label="Canciones que te gustan" />
            <SideLink to="/playlist/$playlistId" params={{ playlistId: "recents" }} icon={<Clock className="size-4" />} label="Escuchadas hace poco" />
            {playlists.map((playlist) => (
              <SideLink key={playlist.id} to="/playlist/$playlistId" params={{ playlistId: playlist.id }} label={playlist.name} />
            ))}
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-2 px-3 py-3 md:px-6">
            <Link to="/" className="md:hidden">
              <Logo />
            </Link>
            <form
              className="relative min-w-0 flex-1"
              onSubmit={(event) => {
                event.preventDefault();
                onSearch(value);
              }}
            >
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                value={value}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Buscar himnos, villancicos, artistas"
                aria-label="Buscar"
                className="h-11 w-full rounded-full bg-surface pr-4 pl-10 text-sm outline-none placeholder:text-muted focus:bg-elevated"
              />
            </form>
          </header>
          <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
      <PlayerBar />
      <nav className="grid h-16 grid-cols-3 border-t border-line bg-bg md:hidden">
        <MobileTab to="/" label="Inicio" icon={<Home className="size-5" />} exact active={pathname === "/"} />
        <MobileTab to="/explore" label="Explorar" icon={<Compass className="size-5" />} active={pathname.startsWith("/explore")} />
        <MobileTab to="/library" label="Biblioteca" icon={<Library className="size-5" />} active={pathname.startsWith("/library")} />
      </nav>
      <NowPlaying />
      <CreatorDialog />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

function trackTitle(id: string) {
  return trackById(id)?.title ?? "Gracia";
}

function Logo() {
  return (
    <span className="grid size-9 place-items-center rounded-lg bg-accent text-fg" aria-hidden>
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M8 5.5v13l11-6.5-11-6.5z" />
      </svg>
    </span>
  );
}

function NavItem({
  to,
  icon,
  label,
  exact,
}: {
  to: "/" | "/explore" | "/library";
  icon: ReactNode;
  label: string;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: Boolean(exact) }}
      className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm text-muted"
      activeProps={{ className: "flex h-11 items-center gap-3 rounded-lg bg-elevated px-3 text-sm font-medium text-fg" }}
    >
      {icon}
      {label}
    </Link>
  );
}

function SideLink({
  to,
  params,
  label,
  icon,
}: {
  to: "/playlist/$playlistId";
  params: { playlistId: string };
  label: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      to={to}
      params={params}
      className="flex h-10 items-center gap-2 truncate rounded-lg px-3 text-sm text-muted"
      activeProps={{ className: "flex h-10 items-center gap-2 truncate rounded-lg bg-elevated px-3 text-sm text-fg" }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}

function MobileTab({
  to,
  label,
  icon,
  active,
  exact,
}: {
  to: "/" | "/explore" | "/library";
  label: string;
  icon: ReactNode;
  active: boolean;
  exact?: boolean;
}) {
  return (
    <Link to={to} activeOptions={{ exact }} className={`flex flex-col items-center justify-center gap-1 text-xs ${active ? "text-fg" : "text-muted"}`}>
      {icon}
      {label}
    </Link>
  );
}
