import { Thumbnail } from '@src/components/_common'
import { TTableHeader } from '../_common/Table/Header'

export const DRAFTS_COLUMNS: TTableHeader[] = [
  {
    key: 'fileName',
    label: 'File name',
    styles: { weight: 700 },
    isColumnOrderable: true,
  },
  { key: 'lastModified', label: 'Last modified', isColumnOrderable: true },
  { key: 'created', label: 'Created', isColumnOrderable: true },
  {
    key: 'authors',
    label: 'Authors',
    customComponent: {
      component: Thumbnail,
      valueKey: 'username',
    },
    isColumnOrderable: false,
  },
  {
    key: '',
    label: '',
    isColumnOrderable: false,
  },
]

export const PUBLISHED_COLUMNS: TTableHeader[] = [
  {
    key: 'fileName',
    label: 'File name',
    styles: { weight: 700 },
    isColumnOrderable: true,
  },
  { key: 'publishedAt', label: 'Published', isColumnOrderable: true },
  {
    key: 'tags',
    label: 'Tags',
    isColumnOrderable: false,
  },
  {
    key: 'fields',
    label: 'Fields',
    isColumnOrderable: false,
  },
  {
    key: 'authors',
    label: 'Authors',
    customComponent: {
      component: Thumbnail,
      valueKey: 'username',
    },
    isColumnOrderable: false,
  },
  {
    key: '',
    label: '',
    isColumnOrderable: false,
  },
]
