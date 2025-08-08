import type { ComponentProps, ReactElement, ReactNode } from 'react';
import React, { Children } from 'react';
import classNames from 'classnames';

export enum IconSize {
  Tiny = 'tiny', // 12px
  Icon = 'icon', // 16px
  Small = 'small', // 20px
  Regular = 'regular', // 24px
  Medium = 'medium', // 28px
  Large = 'large', // 32px
  XLarge = 'xlarge', // 40px
  Huge = 'huge', // 48px
  Giant = 'giant', // 56px
  Massive = 'massive', // 64px
  Enormous = 'enormous', // 80px
}

export const iconSizeClasses: Record<IconSize, string> = {
  [IconSize.Tiny]: 'w-3 h-3', // 12px
  [IconSize.Icon]: 'size-4', // 16px
  [IconSize.Small]: 'w-5 h-5', // 20px
  [IconSize.Regular]: 'w-6 h-6', // 24px
  [IconSize.Medium]: 'w-7 h-7', // 28px
  [IconSize.Large]: 'w-8 h-8', // 32px
  [IconSize.XLarge]: 'w-10 h-10', // 40px
  [IconSize.Huge]: 'w-12 h-12', // 48px
  [IconSize.Giant]: 'w-14 h-14', // 56px
  [IconSize.Massive]: 'w-16 h-16', // 64px
  [IconSize.Enormous]: 'w-20 h-20', // 80px
};

export type IconItemType = React.ComponentType<{ className?: string }>;

export interface IconProps extends ComponentProps<'svg'> {
  secondary?: boolean;
  size?: IconSize;
}

interface Props extends IconProps {
  IconPrimary: IconItemType;
  IconSecondary: IconItemType;
}

const Icon = ({
  secondary = false,
  size = IconSize.Small,
  className = '',
  IconPrimary,
  IconSecondary,
  ...rest
}: Props): ReactElement => {
  const IconComponent = secondary ? IconSecondary : IconPrimary;

  return (
    <IconComponent
      className={classNames(
        iconSizeClasses[size],
        'pointer-events-none',
        className,
      )}
      {...rest}
    />
  );
};

export const IconWrapper = ({
  size,
  wrapperClassName,
  children,
  ...rest
}: Omit<IconProps, 'className'> & {
  wrapperClassName?: string;
  children: ReactNode;
}): ReactElement => {
  return (
    <div className={wrapperClassName}>
      {Children.map(children, (child) => {
        if (React.isValidElement<Props>(child)) {
          const { className = '' } = rest as { className?: string };

          return React.cloneElement(child, {
            ...child.props,
            size,
            className: classNames(child.props.className, className),
          });
        }

        return child;
      })}
    </div>
  );
};

export default Icon;
