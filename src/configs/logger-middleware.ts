export default () => next => action => {
    const { type, payload, meta } = action;
    console.groupCollapsed(type);
    console.log('Payload:', payload);
    console.log('Meta:', meta);
    console.groupEnd();

    return next(action);
};
