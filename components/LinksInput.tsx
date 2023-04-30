import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

import {
  IconButton,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import AddLinkModal from "./AddLinkModal";

import type { Link } from "@/interfaces";

type Props = { id?: string; value: Link[]; onChange: (value: Link[]) => void };

const LinksInput = ({ id, value = [], onChange }: Props) => {
  const [addUrlIsOpen, setAddUrlIsOpen] = useState(false);

  const handleAddUrlClose = (link?: Link) => {
    if (link) {
      onChange([...value, link]);
    }

    setAddUrlIsOpen(false);
  };

  const handleRemove = (title: string) => {
    onChange(value.filter((link) => link.title !== title));
  };

  return (
    <>
      <Wrap id={id}>
        {value.map((link) => (
          <WrapItem key={link.title}>
            <Tag size="lg" variant="solid" colorScheme="teal">
              <TagLabel>{link.title}</TagLabel>
              <TagCloseButton
                aria-label="remove"
                onClick={() => handleRemove(link.title)}
              />
            </Tag>
          </WrapItem>
        ))}

        <WrapItem>
          <IconButton
            aria-label="Add a new link"
            icon={<AddIcon />}
            size="sm"
            onClick={() => setAddUrlIsOpen(true)}
          />
        </WrapItem>
      </Wrap>

      <AddLinkModal isOpen={addUrlIsOpen} onClose={handleAddUrlClose} />
    </>
  );
};

export default LinksInput;
