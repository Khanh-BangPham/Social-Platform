import { Children } from 'react';
export interface StepProps {
  active: number;
  children: any;
}
export const Step: Atom<StepProps> = ({ active, children }) => {
  const _children = Children.toArray(children);
  return (
    <div className="wrap">
      <div className="child">{_children[active]}</div>
    </div>
  );
};
