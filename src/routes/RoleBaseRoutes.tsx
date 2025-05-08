// RoleBasedRoutes.tsx
import { Route, RouteObject } from 'react-router-dom'
import ProtectedRoute from '../Components/ProtectedRoute'
import { UserRoleValue } from '../constants/RolesEnum'

interface RoleBasedRoutesProps {
  basePath: string
  routes: RouteObject[]
  allowedRoles: UserRoleValue[]
}

export const RoleBasedRoutes = ({
  basePath,
  routes,
  allowedRoles,
}: RoleBasedRoutesProps) => {
  return (
    <Route
      key={basePath}
      path={basePath}
      element={<ProtectedRoute allowedRoles={allowedRoles} />}
    >
      {routes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element}>
          {route.children?.map((childRoute, j) => (
            <Route
              key={j}
              path={childRoute.path}
              element={childRoute.element}
              index={childRoute.index}
            />
          ))}
        </Route>
      ))}
    </Route>
  )
}
