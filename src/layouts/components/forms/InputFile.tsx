import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './input-file.css';
import { filter, isEmpty } from 'lodash';
import axiosInstance from '../../../services/axios.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CollectionConstants } from '../../../stores/types/createProfile';
import { translate } from '../../../translates/translate';

type IInputFile = {
  multiple?: boolean;
  name: CollectionConstants;
  value;
  onChange;
  onRemoveFile?: (id: string) => void;
  onUpdateFile?: (id: string, files) => void;
};

const InputFile: React.FC<IInputFile> = ({
  multiple = false,
  name = CollectionConstants.EXAMPLE,
  value = [],
  onChange,
  onRemoveFile = null,
  onUpdateFile = null,
}) => {
  const [files, setFiles] =
    useState<
      { id: string; name: string; preview: string; originalURL?: string }[]
    >(value);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple,
    onDrop: acceptedFiles => {
      if (isEmpty(acceptedFiles)) {
        toast.error(translate('UPLOAD_FILES_FAIL'));
      } else {
        const formData = new FormData();
        const files = acceptedFiles.map(file => {
          formData.append('files[]', file);
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          return file;
        });
        formData.append('collection', name);

        try {
          axiosInstance
            .post(`/api/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(res => {
              const fileId = res?.data?.data;
              files.map(file => (file['id'] = fileId));
              if (onUpdateFile) {
                onUpdateFile(fileId, files);
              } else {
                onChange(files);
              }
              toast.success(translate('UPLOAD_FILES_SUCCESS'));
            });
        } catch (e) {
          toast.error(translate('UPLOAD_FILES_FAIL'));
        }
      }
    },
  });

  const onRemove = (index: number) => {
    const newFiles = filter(files, (file, idx) => idx !== index);
    if (onRemoveFile) {
      onRemoveFile(files[index].id);
    } else {
      onChange(newFiles);
    }
    setFiles(newFiles);
  };

  const thumbs = files.map((file, idx) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.originalURL ?? URL.createObjectURL(file as unknown as Blob)}
          className="img"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
      </div>
      <div className="btn removeThumbImg" onClick={() => onRemove(idx)}>
        <i className="ki-outline ki-trash fs-1" />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    setFiles(value);
  }, [value]);

  return (
    <section className="container">
      {files.length ? (
        <aside className="thumbsContainer">{thumbs}</aside>
      ) : (
        <div {...getRootProps({ className: 'dropzone form-file-upload' })}>
          <input {...getInputProps()} />
          <p>Drag & drop here or browse files</p>
        </div>
      )}
    </section>
  );
};
export default InputFile;
