import { ChangeEvent, useState } from "react"


export type EditableSpanPropsType = {
    title: string
    onChange: (localTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(props.title);

    const activateEditMode = () => setEditMode(true);
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(localTitle)
    };

    const onChangeTitleHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(event.currentTarget.value)
    }

    return editMode
        ? <input value={localTitle} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}