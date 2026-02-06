import { Pencil, Check, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface EditButtonProps {
  isEditMode: boolean;
  onToggle: () => void;
  onExport: () => void;
  onImport: (data: string) => boolean;
  onReset: () => void;
}

export function EditButton({ isEditMode, onToggle, onExport, onImport, onReset }: EditButtonProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = onImport(content);
        if (success) {
          alert('数据导入成功！');
        } else {
          alert('数据导入失败，请检查文件格式。');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {isEditMode && (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="w-12 h-12 rounded-full shadow-lg bg-background/80 backdrop-blur-xl border border-white/10"
              >
                <Download className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10">
              <DialogHeader>
                <DialogTitle>数据管理</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">导出数据</p>
                  <Button onClick={onExport} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    导出为 JSON
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">导入数据</p>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">重置数据</p>
                  <Button onClick={onReset} variant="destructive" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重置为默认
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
      
      <Button
        onClick={onToggle}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isEditMode
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-primary hover:bg-primary/90'
        }`}
      >
        {isEditMode ? (
          <Check className="w-6 h-6" />
        ) : (
          <Pencil className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
