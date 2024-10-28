import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Status } from '@/lib/types';

interface IBadgeColors {
  key: Status;
  colorClass: string;
}

const StatusList: IBadgeColors[] = [
  { key: Status.Open, colorClass: "bg-emerald-300 text-emerald-800" },
  { key: Status.Closed, colorClass: "bg-slate-300 text-slate-800" },
  { key: Status.Draft, colorClass: "bg-amber-200 text-amber-800" },
  { key: Status.Sent, colorClass: "bg-sky-300 text-sky-800" },
  { key: Status.Committed, colorClass: "bg-violet-300 text-violet-800" },
  { key: Status.Saved, colorClass: "bg-teal-300 text-teal-800" },
  { key: Status.Voided, colorClass: "bg-rose-300 text-rose-800" },
  { key: Status.Approved, colorClass: "bg-green-300 text-green-800" },
  { key: Status.Rejected, colorClass: "bg-red-300 text-red-800" },
  { key: Status.Pending, colorClass: "bg-yellow-200 text-yellow-800" },
  { key: Status.InProgress, colorClass: "bg-blue-300 text-blue-800" },
  { key: Status.Completed, colorClass: "bg-lime-300 text-lime-800" },
  { key: Status.Cancelled, colorClass: "bg-pink-300 text-pink-800" },
  { key: Status.OnHold, colorClass: "bg-orange-200 text-orange-800" },
  { key: Status.Delayed, colorClass: "bg-amber-300 text-amber-800" },
  { key: Status.Partial, colorClass: "bg-yellow-300 text-yellow-800" },
  { key: Status.Submitted, colorClass: "bg-cyan-300 text-cyan-800" },
  { key: Status.Accepted, colorClass: "bg-emerald-300 text-emerald-800" },
  { key: Status.SendBack, colorClass: "bg-rose-300 text-rose-800" },
  { key: Status.Review, colorClass: "bg-amber-200 text-amber-800" },
  { key: Status.Deleted, colorClass: "bg-rose-300 text-rose-800" },
  { key: Status.Received, colorClass: "bg-emerald-300 text-emerald-800" },
];

const CustomStatusBadge = ({
  children,
  badgeColor,
  status,
}: {
  children: React.ReactNode;
  badgeColor?: Status;
  status?: Status | string;
}) => {

  const effectiveStatus = (status ?? badgeColor) as Status;
  const colorClass = StatusList.find(color => color.key === effectiveStatus)?.colorClass || "bg-gray-300";

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
