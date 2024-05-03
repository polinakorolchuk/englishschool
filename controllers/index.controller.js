exports.rendHome = async(req, res) => {
    try {
        res.render('pages/p_index/commonpage', { contentPath: 'home', pageTitle: 'PuzzleEnglish'});
        } catch (error) {
        
    }
}

exports.rendAbout = async(req, res) => {
    try {
        res.render('pages/p_index/commonpage', { contentPath: 'about', pageTitle: 'PuzzleEnglish'});
        } catch (error) {
        
    }
}


exports.rendA = async(req, res) => {
    try {
        res.render('pages/p_index/commonpage', { contentPath: 'a', pageTitle: 'PuzzleEnglish'});
        } catch (error) {
        
    }
}

exports.rendContacts = async(req, res) => {
    try {
        res.render('pages/p_index/commonpage', { contentPath: 'contacts', pageTitle: 'PuzzleEnglish'});
        } catch (error) {
        
    }
}