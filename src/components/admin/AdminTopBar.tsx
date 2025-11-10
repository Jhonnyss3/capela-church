import { Menu } from 'lucide-react';

interface AdminTopBarProps {
  title: string;
  onMenuToggle: () => void;
}

const AdminTopBar = ({ title, onMenuToggle }: AdminTopBarProps) => {
  return (
    <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Bem-vindo ao painel administrativo
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-foreground">Admin</p>
          <p className="text-xs text-muted-foreground">capelachurch@gmail.com</p>
        </div>
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;