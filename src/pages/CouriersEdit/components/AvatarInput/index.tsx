import React, { useState, useEffect } from 'react';

import { Container, InitialsDisplay } from './styles';

import { ICourierDisplay } from '../..';

interface IProps {
  onChange(avatar: File | null): void;
  initialImage?: string;
  courierDisplay?: ICourierDisplay;
}

const AvatarInput: React.FC<IProps> = ({
  onChange,
  initialImage = null,
  courierDisplay,
}) => {
  const [image, setImage] = useState<string | null>(initialImage);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

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

        {!image && courierDisplay && (
          <InitialsDisplay colorTheme={courierDisplay.theme}>
            {courierDisplay.initials}
          </InitialsDisplay>
        )}

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
