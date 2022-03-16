import { Redirect, Switch } from 'react-router-dom'
import PrivateRoute from './privateRoute'

function renderRouter(routes) {
  return (
    <Switch>
      {routes.map((item) => {
        const { component, children, ...rest } = item
        return item.redirect ? (
          <Redirect key={item.to} {...rest} />
        ) : (
          <PrivateRoute
            {...rest}
            key={item.path}
            render={(props) => {
              return <item.component {...props}>{item.children && renderRouter(item.children)}</item.component>
            }}
          />
        )
      })}
    </Switch>
  )
}

export default renderRouter
