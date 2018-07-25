export default () => next => action => {
    const { type, payload } = action;
    console.groupCollapsed(type);
    try {
        console.log('Payload:', payload)
    }catch(e){
        console.log('Payload:', 'undefined')
    }
    console.groupEnd();
    return next(action);
};
