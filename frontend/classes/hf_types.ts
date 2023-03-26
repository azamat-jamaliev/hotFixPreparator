export interface HF {
	Name        : string    /* Name - usually Jira ticket is used instead of name */
	ReleaseDate : Date /* when current verrsion of HF was prepared and uploaded */
	Content     : string[]  /* list of files which are incorporated into the HF*/
}
export interface CD {
	Name    : string /* Code drop for which the HFs should be installed */
	Content : HF[]
}
