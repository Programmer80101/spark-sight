"use client";

import { Button } from "@/components/ui/button";
import { FieldWithToolbar } from "./field-toolbar";
import type { LocalForm, Field, FieldType } from "@/firebase/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { InsertInputSelection } from "./input-selection";

type FormEditorRendererForm = {
  draftForm: LocalForm;
  setDraftForm: (form: LocalForm) => void;
};

export function DynamicFormEditorRenderer({
  draftForm,
  setDraftForm,
}: FormEditorRendererForm) {
  const [insertOrder, setInsertOrder] = useState<number | null>(null);

  const insert = (order: number) => setInsertOrder(order);

  const insertField = (fieldType: FieldType) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      type: fieldType,
      label: "Label",
      placeholder: "Placeholder...",
      required: false,
      order: insertOrder! + 1,
    };

    const fields = draftForm.fields;
    const start = fields.slice(0, insertOrder!);
    const end = fields.slice(insertOrder!, fields.length).map((field) => {
      return {
        ...field,
        order: field.order + 1,
      };
    });

    setDraftForm({
      ...draftForm,
      fields: [...start, newField, ...end],
    });

    setInsertOrder(null);
  };

  const updateField = (order: number, newField: Field) => {
    draftForm.fields[order] = newField;
    setDraftForm(draftForm);
  };

  const deleteField = (order: number) => {
    setDraftForm({
      ...draftForm,
      fields: draftForm.fields.filter((field) => field.order !== order),
    });
  };

  const moveField = (from: number, to: number) => {
    const fields = draftForm.fields;

    const temp = fields[from];
    fields[from] = fields[to];
    fields[to] = temp;

    setDraftForm({
      ...draftForm,
      fields: fields,
    });
  };

  return (
    <div className="space-y-4">
      <InsertInputSelection
        open={insertOrder !== null}
        insertField={insertField}
        onOpenChange={() => setInsertOrder(null)}
      />
      {draftForm.fields.length === 0 ? (
        <Button
          variant="default"
          size="small"
          onClick={() => insert(0)}
        >
          <Plus />
          Add First Field
        </Button>
      ) : (
        draftForm.fields.map((field, index) => (
          <FieldWithToolbar
            key={field.id}
            field={field}
            index={index}
            total={draftForm.fields.length}
            insert={insert}
            remove={deleteField}
            update={updateField}
            move={moveField}
          />
        ))
      )}
    </div>
  );
}
