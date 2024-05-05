import { Notify, Platform } from 'quasar';
import { NotificationEnum } from '@common/constants';

export const NotifyFn = (nType: NotificationEnum, message: string, timeout: number, caption?: string, classes?: string, icon?: string, iconColor?: string): void =>
{
  const nTypeClasess = {
    [NotificationEnum.SUCCESS]: 'bg-app-info text-dark',
    [NotificationEnum.ERROR]: 'bg-app-danger text-white',
    [NotificationEnum.INFO]: 'bg-app-info text-white',
    [NotificationEnum.WARNING]: 'bg-app-warning text-black'
  };

  const nTypeIcon = {
    [NotificationEnum.SUCCESS]: 'check_circle',
    [NotificationEnum.ERROR]: 'warning',
    [NotificationEnum.INFO]: 'info',
    [NotificationEnum.WARNING]: 'priority_high'
  };

  Notify.create({
    message: `<span class=${Platform.is.mobile ? 'fs-14' : 'fs-18'}>${message}</span>`,
    timeout,
    position: Platform.is.mobile ? 'bottom' : 'bottom-left',
    classes: `text-weight-medium ${nTypeClasess[nType]} ${classes} ${ Platform.is.mobile ? 'fs-12 br-8' : 'fs-15 br-8' } }`,
    icon: icon || nTypeIcon[nType],
    html: true,
    caption: Platform.is.mobile ? caption : caption?.replace(/\n/g, '<br />') ?? '',
    iconColor,
    multiLine: true
  });
};
