export interface StepIcon {
  iconName: string;
  bgColor: string;
  textColor: string;
}

export interface Step {
  status: 'pending' | 'processing' | 'shipped' | 'completed';
  label: string;
  description: string;
  icon: StepIcon;
}
