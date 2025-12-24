type FieldType = "text" | "month" | "textarea";

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder: string;
  rowsTextArea?: number;
}

interface RepeatableSectionProps<T> {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: T;
  fields: FieldConfig<T>[];
}

export default function RepeatableSection<T extends Record<string, unknown>>({
  title,
  items,
  onChange,
  emptyItem,
  fields,
}: RepeatableSectionProps<T>) {
  function addItem() {
    onChange([...items, structuredClone(emptyItem)]);
  }

  function updateItem(index: number, field: keyof T, value: unknown) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <button
          type="button"
          onClick={addItem}
          className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 transition"
        >
          + Add {title.toLowerCase()}
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-zinc-500">
          No {title.toLowerCase()} added yet.
        </p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-300">
              {title} #{index + 1}
            </span>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              − Remove
            </button>
          </div>

          {fields.map((field) => {
            const value = item[field.name] ?? "";

            return (
              <div key={String(field.name)}>
                <label className="mb-1 block text-sm text-zinc-400">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    value={value as string}
                    rows={field.rowsTextArea}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) =>
                      updateItem(index, field.name, e.target.value || null)
                    }
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={value as string}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) =>
                      updateItem(index, field.name, e.target.value || null)
                    }
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
