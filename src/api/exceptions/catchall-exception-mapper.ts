export const catchallExceptionMapper = (err: any, req: any, res: any, next: any) => {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: `Unknown server error` });
};
