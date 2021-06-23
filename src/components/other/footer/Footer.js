import React from 'react';
import { Icon } from '@iconify/react';
import githubFilled from '@iconify/icons-ant-design/github-filled';
import portfolioIcon from '@iconify/icons-bytesize/portfolio';
import linkedinFilled from '@iconify/icons-ant-design/linkedin-filled';

import './footer.styles.scss';

const Footer = () => {
    return (
        <div className="footer">
            <a
                href="https://github.com/patrick-replogle/co-make-fe"
                target="blank"
            >
                <Icon icon={githubFilled} style={{ fontSize: '45px' }} />
            </a>

            <a href="https://patrick-replogle.com/" target="blank">
                <Icon icon={portfolioIcon} style={{ fontSize: '40px' }} />
            </a>

            <a
                href="https://www.linkedin.com/in/patrick-replogle/"
                target="blank"
            >
                <Icon icon={linkedinFilled} style={{ fontSize: '45px' }} />
            </a>
        </div>
    );
};

export default Footer;
