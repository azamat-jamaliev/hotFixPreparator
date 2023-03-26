package archivarius

import (
	"strings"
	"testing"

	"golang.org/x/exp/slices"
)

// func TestEnvOpsManager_Upload(t *testing.T) {
func Test_UnzipPackage(t *testing.T) {
	if files, e := UnzipPackage("../../../test_data/Archive.zip", "../../../test/TestArchiveFolder"); e != nil || files == nil {
		t.Fatalf("UnzipPackage. Error=[%v], files=[%s]", e, strings.Join(files, ","))
	} else {
		//assets/Application.js
		if !slices.Contains(files, "assets/Application.js") /* file example */ ||
			slices.Contains(files, "assets") /* folder example */ {
			t.Fatalf("Contains wrong data - only Files are expected. Error=[%v], files=[%s]", e, strings.Join(files, ","))
		}
	}
}

// exists returns whether the given file or directory exists
func Test_dirExists(t *testing.T) {
	if b, e := dirExists("../zipHelper"); !b || e != nil {
		t.Fatalf("not archivarius dir. Error=[%v]", e)
	}
	if b, e := dirExists("../zipHelper/zipHelper_test.go"); b || e == nil {
		t.Fatalf("File existis instead of Directory. Error=[%v]", e)
	}
}
