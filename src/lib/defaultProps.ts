import { mergeProps, MergeProps } from 'solid-js';

export function defaultProps<Props, Key extends keyof Props>(
  defaults: Required<Pick<Props, Key>>,
  props: Props,
): MergeProps<[Required<Pick<Props, Key>>, Props]> {
  return mergeProps(defaults, props);
}
