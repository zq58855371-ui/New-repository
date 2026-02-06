import { useState, useRef, useEffect } from 'react';
import { Pencil, Check, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  isEditMode: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export function EditableText({
  value,
  onSave,
  isEditMode,
  multiline = false,
  className = '',
  placeholder = '点击编辑...',
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditMode) {
    return <span className={className}>{value || placeholder}</span>;
  }

  if (isEditing) {
    return (
      <div className="flex items-start gap-2">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-foreground min-h-[100px]"
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-foreground"
          />
        )}
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8 text-green-500">
            <Check className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 text-red-500">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex items-center gap-2 cursor-pointer ${className}`}
      onClick={() => setIsEditing(true)}
    >
      <span>{value || placeholder}</span>
      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
    </div>
  );
}

interface EditableListProps {
  items: string[];
  onSave: (items: string[]) => void;
  isEditMode: boolean;
  className?: string;
}

export function EditableList({ items, onSave, isEditMode, className = '' }: EditableListProps) {
  const [editItems, setEditItems] = useState<string[]>(items);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setEditItems([...editItems, '']);
  };

  const handleRemove = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, value: string) => {
    setEditItems(editItems.map((item, i) => (i === index ? value : item)));
  };

  const handleSave = () => {
    onSave(editItems.filter(item => item.trim() !== ''));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditItems(items);
    setIsEditing(false);
  };

  if (!isEditMode) {
    return (
      <ul className={className}>
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-2">
        {editItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => handleUpdate(index, e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-foreground"
            />
            <Button size="icon" variant="ghost" onClick={() => handleRemove(index)} className="h-8 w-8 text-red-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Button onClick={handleAdd} variant="outline" size="sm" className="flex-1">
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
          <Button onClick={handleSave} variant="default" size="sm">
            <Check className="w-4 h-4 mr-1" />
            保存
          </Button>
          <Button onClick={handleCancel} variant="ghost" size="sm">
            <X className="w-4 h-4 mr-1" />
            取消
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group cursor-pointer ${className}`} onClick={() => setIsEditing(true)}>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity mt-2" />
    </div>
  );
}
