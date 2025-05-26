import React from 'react';
import Modal from '../ui/Modal';

interface DetailModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  item: T | null;
  title: string;
  fields: Array<{
    key: keyof T;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
  }>;
}

const DetailModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  item,
  title,
  fields,
}: DetailModalProps<T>) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={String(field.key)} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {field.label}
              </label>
              <div className="text-gray-900">
                {field.render ? (
                  field.render(item[field.key], item)
                ) : (
                  <div className="break-words whitespace-pre-wrap">
                    {String(item[field.key] || '')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default DetailModal;
