package bean;

public class Student {
	private int sid;
	private String sname;
	private String spwd;
	private String snickname;
	private int sage;
	private String signature;
	
	
	
	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Student(int sid, String sname, String spwd, String snickname,
			int sage, String signature) {
		super();
		this.sid = sid;
		this.sname = sname;
		this.spwd = spwd;
		this.snickname = snickname;
		this.sage = sage;
		this.signature = signature;
	}
	public int getSid() {
		return sid;
	}
	public void setSid(int sid) {
		this.sid = sid;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getSpwd() {
		return spwd;
	}
	public void setSpwd(String spwd) {
		this.spwd = spwd;
	}
	public String getSnickname() {
		return snickname;
	}
	public void setSnickname(String snickname) {
		this.snickname = snickname;
	}
	public int getSage() {
		return sage;
	}
	public void setSage(int sage) {
		this.sage = sage;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	
}
