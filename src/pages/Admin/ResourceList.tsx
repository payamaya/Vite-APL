import { ResourceListProps } from '../../types/ResourceList'

const ResourceList = <T,>({
  items,
  loading = false,
  error = null,
  emptyMessage = 'No items available',
  renderItem,
  keyExtractor,
  className = '',
  listClassName = 'list-group',
  itemClassName = 'list-group-item border rounded m-2',
}: ResourceListProps<T>) => {
  if (loading) return <p>Loading...</p>
  if (error) return <div className='alert alert-danger'>{error}</div>
  if (items.length === 0) return <p className='text-danger'>{emptyMessage}</p>

  return (
    <div className={className}>
      <ul className={listClassName}>
        {items.map((item) => (
          <li key={keyExtractor(item)} className={itemClassName}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ResourceList
