export const homePage = (req,res) => {
    res.render('pages/index', { ads:true })
}

export const createPage = (req,res) => {
    res.render('pages/table', { ads:true })
}

export const submitPage = (req,res) => {
    res.render('pages/submit', { ads:false })
}

export const intervalsPage = (req,res) => {
    res.render('pages/intervals', { ads:true })
}