export type Database = {
  tags: TagsType[];
};

export type TagsType = {
  id: string;
  tag_name: string;
  user: string;
  created_at: string;
};

export type Note = {
  uuid: string;
  title: string;
  note: string;
  tags: string;
  user: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
};
