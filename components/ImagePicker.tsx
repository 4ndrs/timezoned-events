import { useEffect, useState } from "react";
import { Box, Card, useColorModeValue } from "@chakra-ui/react";

import Image from "next/image";

type Props = { value?: string; onChange: (value?: string) => void };

const images = [
  "/images/no-image.svg",
  "/images/lumine-hype.webp",
  "/images/fischl-hype.webp",
];

const ImagePicker = ({ value, onChange }: Props) => {
  const [pickedImageIndex, setPickedImageIndex] = useState(0);

  useEffect(() => {
    if (!value) {
      setPickedImageIndex(0);
    } else {
      const index = images.indexOf(value);

      if (index === -1) {
        throw new Error(`Image set does not exist: ${value}`);
      }

      setPickedImageIndex(index);
    }
  }, [value]);

  const handleClick = (index: number) => {
    if (index === 0) {
      return onChange("");
    }

    return onChange(images[index]);
  };

  const bgColor = useColorModeValue("primary.whitish", "dark.whitish");

  return (
    <Card
      variant="outline"
      width="429px"
      height="194px"
      m="50px auto"
      overflow="hidden"
      position="relative"
      backgroundColor={bgColor}
    >
      {images.map((url, index) => (
        <Box
          key={url}
          onClick={() => handleClick(index)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            cursor: "pointer",
            transition: "transform 200ms ease-out",
            zIndex: index === pickedImageIndex ? 1 : 0,
            transform:
              index === pickedImageIndex
                ? "translate(-50%, -50%) scale(1.2)"
                : `translateX(${
                    (index - pickedImageIndex) * 100
                  }%) translate(-50%, -50%)`,
          }}
        >
          <Image
            width={130}
            height={130}
            style={{ width: "130px", height: "130px", objectFit: "cover" }}
            src={url}
            alt={index === 0 ? "No image" : `Image ${index}`}
          />
        </Box>
      ))}
    </Card>
  );
};

export default ImagePicker;
