import React from 'react';
import { Badge } from "@/components/ui/badge";

export enum Status {
  Open = "Open",
  Closed = "Closed",
  Draft = "Draft",
  Sent = "Sent",
  Committed = "Committed",
  Saved = "Saved",
  Voided = "Voided",
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  OnHold = "OnHold",
  Delayed = "Delayed",
  Partial = "Partial",
  Submitted = "Submitted",
  Accepted = "Accepted",
  SendBack = "SendBack",
  Review = "Review",
  Deleted = "Deleted",
  Received = "Received",
}

export interface IBadgeColors {
  key: Status;
  Color: string;
}

export const StatusList: IBadgeColors[] = [
  { key: Status.Open, Color: "bg-emerald-300 text-emerald-800" },
  { key: Status.Closed, Color: "bg-slate-300 text-slate-800" },
  { key: Status.Draft, Color: "bg-amber-200 text-amber-800" },
  { key: Status.Sent, Color: "bg-sky-300 text-sky-800" },
  { key: Status.Committed, Color: "bg-violet-300 text-violet-800" },
  { key: Status.Saved, Color: "bg-teal-300 text-teal-800" },
  { key: Status.Voided, Color: "bg-rose-300 text-rose-800" },
  { key: Status.Approved, Color: "bg-green-300 text-green-800" },
  { key: Status.Rejected, Color: "bg-red-300 text-red-800" },
  { key: Status.Pending, Color: "bg-yellow-200 text-yellow-800" },
  { key: Status.InProgress, Color: "bg-blue-300 text-blue-800" },
  { key: Status.Completed, Color: "bg-lime-300 text-lime-800" },
  { key: Status.Cancelled, Color: "bg-pink-300 text-pink-800" },
  { key: Status.OnHold, Color: "bg-orange-200 text-orange-800" },
  { key: Status.Delayed, Color: "bg-amber-300 text-amber-800" },
  { key: Status.Partial, Color: "bg-yellow-300 text-yellow-800" },
  { key: Status.Submitted, Color: "bg-cyan-300 text-cyan-800" },
  { key: Status.Accepted, Color: "bg-emerald-300 text-emerald-800" },
  { key: Status.SendBack, Color: "bg-rose-300 text-rose-800" },
  { key: Status.Review, Color: "bg-amber-200 text-amber-800" },
  { key: Status.Deleted, Color: "bg-rose-300 text-rose-800" },
  { key: Status.Received, Color: "bg-emerald-300 text-emerald-800" },
];


const CustomStatusBadge = ({
  children,
  badgeColor,
  status,
}: {
  children: React.ReactNode;
  badgeColor?: Status;
  status?: Status;
}) => {
  badgeColor = status ?? badgeColor;

  const colorClass = StatusList.find(color => color.key === badgeColor)?.Color || "bg-gray-300";

  return (
    <Badge className={`${colorClass} rounded-full`}>
      {children}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: Status }) => {
  return <CustomStatusBadge status={status}>{status}</CustomStatusBadge>;
};


export default StatusBadge;
