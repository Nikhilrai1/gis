
import { useState } from "react";
import { toast } from "react-toastify";

const getShortenedVal = (val: string) => {
  const splited = val.split(".");
  const ext = splited[splited.length - 1];

  let i = 0;
  let name = "";

  do {
    name = name + splited[i];
    i++;
  } while (i < splited.length - 1);

  if (name.length > 15) {
    name = name.slice(0, 12) + "..." + name.slice(name.length - 3, name.length);
  }

  return name + "." + ext;
};

const returnImgUrl = (file: File | null) => {
  if (file?.type === "image/png" || file?.type === "image/jpeg") {
    return URL.createObjectURL(file);
  }
  return "/file_icon.png";
};

type ImageInputProps = {
  name: string;
  label: string;
  value: File | null;
  onChange: (val: File | null) => void;
  errorMsg: string;
};

export const ImageUploadCard = (props: ImageInputProps) => {
  const [val, setVal] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length) {
        if (e.target.files[0].type.startsWith("image")) {
          props.onChange && props.onChange(e.target.files[0]);
          setVal(e.target.files[0]);
        } else {
          toast.warn("Please select an image.");
        }
      } else {
        setVal(null);
        props.onChange(null);
      }
    } else {
      setVal(null);
      props.onChange(null);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVal(null);
    props.onChange(null);
  };

  const onInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };
  return (
    <div>
      <label>{props.label}</label>
      {val || props.value ? (
        <label htmlFor={props.name}>
          <img
            onClick={(e) => e.preventDefault()}
            src={val ? returnImgUrl(val) : returnImgUrl(props.value)}
          />
          <button>
           edit
          </button>
          <button onClick={handleClose}>
            delete
          </button>
        </label>
      ) : (
        <label htmlFor={props.name}>
         name
        </label>
      )}

      <input
        id={props.name}
        type="file"
        onChange={handleFileChange}
        onClick={onInputClick}
        hidden
      />
      <div>{val ? getShortenedVal(val.name) : ""}</div>
    </div>
  );
};
