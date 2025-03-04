import React, { useState } from 'react';
import { MdInsertPhoto } from 'react-icons/md';

import { Container } from './styles';

interface IProps {
  onChange(avatar: File | null): void;
}

const AvatarInput: React.FC<IProps> = ({ onChange }) => {
  const [image, setImage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { target } = e;

    const file = target.files ? target.files[0] : null;

    onChange(file);

    if (!file) {
      setImage(null);
      return;
    }

    const imageBlob = window.URL.createObjectURL(file);

    setImage(imageBlob);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {image && <img src={image} alt="avatar do entregador" />}

        <MdInsertPhoto />

        <strong>Adicionar foto</strong>

        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </Container>
  );
};

export default AvatarInput;
