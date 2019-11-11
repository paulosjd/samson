React frontend for a [web application](http://mysite.com) used to track individuals health metrics.

First install all the dependencies

```sh
npm install
```

To start the app type
```sh
npm start
```

**Examples of usage of features from used libraries**

*nb* Referenced usages and their file paths at time of writing

Hooks

`useDispatch` and `useSelector` in `src/components/nav_items/profile_shares`. 
These gives access to the `dispatch` method and Redux store state

Multiple dispatches after `axios.get` call in async action creator which is handled by Redux Thunk: 
Simultaneous, successive dispatches in `postEditedDataPoints`, `loadSharedViewData` in `src/store/actions/body`. 

