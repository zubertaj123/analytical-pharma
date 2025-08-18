export interface RegulatoryPackageProps {
  id: string;
  name: string;
  status: 'draft' | 'in-review' | 'approved' | 'rejected';
  createdDate: string;
  lastModified: string;
  submissionDate?: string;
  includeProtocol?: boolean;
  includeReport?: boolean;
}

export interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

export interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}
