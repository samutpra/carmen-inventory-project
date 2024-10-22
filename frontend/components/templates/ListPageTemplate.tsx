import React, { ReactNode } from "react";

interface IProps {
  title: string;
  actionButtons?: ReactNode;
  filters?: ReactNode;
  content: ReactNode;
  bulkActions?: ReactNode;
}

const ListPageTemplate: React.FC<IProps> = ({
  title,
  actionButtons,
  filters,
  content,
  bulkActions,
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="md:flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        {actionButtons && <div className="mt-4 md:mt-0">{actionButtons}</div>}
      </div>
      {filters && <div className="mb-4">{filters}</div>}
      {bulkActions && <div className="mb-4">{bulkActions}</div>}
      <div className="bg-background rounded-lg shadow">{content}</div>
    </div>
  );
};

export default ListPageTemplate;
