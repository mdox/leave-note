export interface FieldProps {
  isEditing: boolean;
  view: () => JSX.Element;
  edit: () => JSX.Element;
}

export function Field(props: FieldProps) {
  return props.isEditing ? props.edit() : props.view();
}
