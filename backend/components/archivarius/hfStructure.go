package archivarius

import "time"

type HF struct {
	Name        string    /* Name - usually Jira ticket is used instead of name */
	ReleaseDate time.Time /* when current verrsion of HF was prepared and uploaded */
	Content     []string  /* list of files which are incorporated into the HF*/
}
type CD struct {
	Name    string /* Code drop for which the HFs should be installed */
	Content []HF
}
